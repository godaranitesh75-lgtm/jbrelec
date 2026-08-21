import { prisma } from '../libs/prisma.js';

export async function createAudit(payload: {
  actorId: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: unknown;
  ipAddress?: string;
}) {
  return prisma.auditLog.create({
    data: {
      actorId: payload.actorId,
      actorRole: payload.actorRole,
      action: payload.action,
      entityType: payload.entityType,
      entityId: payload.entityId,
      metadata: payload.metadata ? JSON.parse(JSON.stringify(payload.metadata)) : undefined,
      ipAddress: payload.ipAddress,
    },
  });
}
