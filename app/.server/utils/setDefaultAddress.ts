import { PrismaClient } from "@prisma/client/extension";

// When setting an address as default
export default async function setDefaultAddress(userId: number, addressId: number) {
  const prisma = new PrismaClient;

  // Use a transaction to ensure consistency
  await prisma.$transaction(async (tx) => {
    // First, set all addresses for this user to non-default
    await tx.address.updateMany({
      where: { userId },
      data: { isDefault: false }
    });

    // Then set the selected address as default
    await tx.address.update({
      where: { id: addressId },
      data: { isDefault: true }
    });
  });
}