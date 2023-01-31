import { withApiContext } from "@/middleware/withApiContext";

export default withApiContext((context) => {
  return { a: true };
});
