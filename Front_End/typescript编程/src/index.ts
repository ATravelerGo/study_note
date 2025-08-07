type Reserve = {
  (from: string, to: string, destination: string): void;
};

const reserve: Reserve = (
  from: string,
  to: string | undefined,
  destination: string,
) => {
  console.log(from);
  if (to) {
    console.log(to);
  }
  console.log(destination);
};
reserve("1", "2", "3");
