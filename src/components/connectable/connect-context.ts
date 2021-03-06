import { createContext } from 'react';
import { Port } from '../../services/element/port';
import { Connection } from '../../services/relationship/connection';

export interface ConnectContext {
  isDragging: boolean;
  onStartConnect: (port: Port) => (event: PointerEvent) => Promise<Connection>;
  onEndConnect: (port: Port) => (event: PointerEvent) => void;
}

export const {
  Consumer: ConnectConsumer,
  Provider: ConnectProvider,
} = createContext<ConnectContext | null>(null);
