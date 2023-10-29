export const userSelect = {
  id: true,
  firstname: true,
  lastname: true,
  pseudo: true,
  email: true,
  rating: true,
  listOfTontine: {
    select: {
      id: true,
      dayOfPayment: true,
      monthlyContribution: true,
      nberOfAttendee: true,
      listOfUser: true,
      orderOfPayment: true,
      createAt: true,
    },
  },
  tontineCreated: {
    select: {
      id: true,
      nberOfAttendee: true,
      monthlyContribution: true,
      createAt: true,
    },
  },
};
