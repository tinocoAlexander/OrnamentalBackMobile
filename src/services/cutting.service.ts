import { Session } from '../models/Session';

/**
 * Genera un cuttingPath sencillo a partir del mappingPath de una sesión.
 * Recorrido: barrido en zig-zag sobre el área mapeada.
 */
export const generateCuttingPathService = async (sessionId: string) => {
  const session = await Session.findById(sessionId);
  if (!session) throw new Error('Session not found');
  if (!session.mappingPath || session.mappingPath.length === 0)
    throw new Error('Mapping path is empty');

  // Encuentra límites del mapa
  const xs = session.mappingPath.map(p => p.x);
  const ys = session.mappingPath.map(p => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const step = 1; // tamaño del paso entre líneas de corte
  const path: { x: number; y: number; timestamp: number }[] = [];
  const timestamp = Date.now();

  let direction = 1;

  for (let y = minY; y <= maxY; y += step) {
    if (direction === 1) {
      // de minX a maxX
      for (let x = minX; x <= maxX; x += step) {
        path.push({ x, y, timestamp });
      }
    } else {
      // de maxX a minX
      for (let x = maxX; x >= minX; x -= step) {
        path.push({ x, y, timestamp });
      }
    }
    direction *= -1; // cambia la dirección
  }

  session.cuttingPath = path;
  await session.save();

  return session;
};
