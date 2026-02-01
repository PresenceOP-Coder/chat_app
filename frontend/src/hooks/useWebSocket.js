import { useState, useEffect, useRef, useCallback } from 'react';

function useWebSocket(username, onMessage) {
    const [connected, setConnected] = useState(false);
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    const getWebSocketUrl = useCallback(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        return `${protocol}//${host}/ws?username=${encodeURIComponent(username)}`;
    }, [username]);

    const connect = useCallback(() => {
        const wsUrl = getWebSocketUrl();
        console.log('Connecting to:', wsUrl);

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('✅ WebSocket connected');
            setConnected(true);
        };

        ws.onmessage = (event) => {
            console.log('📨 Message received:', event.data);
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (e) {
                // If not JSON, treat as plain text (backward compatibility)
                console.warn('Received non-JSON message:', event.data);
                const parts = event.data.split(': ');
                const messageObj = {
                    username: parts[0] || 'User',
                    content: parts.slice(1).join(': ') || event.data,
                    send_at: new Date(),
                };
                onMessage(messageObj);
            }
        };

        ws.onerror = (error) => {
            console.error('❌ WebSocket error:', error);
            setConnected(false);
        };

        ws.onclose = () => {
            console.log('🔌 WebSocket disconnected');
            setConnected(false);

            // Attempt to reconnect after 3 seconds
            reconnectTimeoutRef.current = setTimeout(() => {
                console.log('🔄 Attempting to reconnect...');
                connect();
            }, 3000);
        };

        wsRef.current = ws;
    }, [getWebSocketUrl, onMessage]);

    useEffect(() => {
        connect();

        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [connect]);

    const sendMessage = useCallback((message) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(message);
        } else {
            console.warn('WebSocket is not connected');
        }
    }, []);

    return { connected, sendMessage };
}

export default useWebSocket;
