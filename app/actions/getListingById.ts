import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
}

export default async function getListingById(searchParams: IParams) {
  try {
    const { listingId, userId } = searchParams;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
        // userId: userId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    const formattedListing = {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: listing.user
        ? {
            ...listing.user,
            createdAt: listing.user.createdAt.toString(),
            updatedAt: listing.user.updatedAt.toString(),
            emailVerified:
              listing.user.emailVerified?.toString() || null,
          }
        : null,
    };

    return formattedListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
