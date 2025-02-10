export const totalDonation = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // const amount = req.query.amount;
  // const days = req.query.days;
  // const lte = new Date();
  // const gte = new Date(lte);
  // const todayDay = lte.getMonth();
  // gte.setDate(todayDay - Number(days));
  // console.log(gte);
  // try {
  //   const donation = await prisma.donation.findMany({
  //     where: {
  //       AND: [{ recipentId: id }, amount ? { amount: Number(amount) } : {}],
  //       createdAt: { gte, lte },
  //     },
  //   });
  //   res.json(donation);
  // } catch (e) {
  //   console.error(e, "received donation error");
  // }
};
