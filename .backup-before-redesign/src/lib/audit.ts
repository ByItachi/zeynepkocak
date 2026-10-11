import { prisma } from "@/lib/prisma";

export async function logAudit(params: {
  userId?: string | null;
  action: string;
  entity?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  await prisma.auditLog.create({
    data: {
      userId: params.userId ?? null,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      metadata: params.metadata ? JSON.stringify(params.metadata) : null,
    },
  });
}
