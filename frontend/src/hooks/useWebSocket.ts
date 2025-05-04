import { useEffect, useRef } from 'react';

export function useWebSocket(userId: string | undefined) {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;

    socket.current = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/ws/${userId}`
    );

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle different types of updates
      // e.g., update UI with progress or completion
    };

    return () => {
      socket.current?.close();
    };
  }, [userId]);

  return socket.current;
}
