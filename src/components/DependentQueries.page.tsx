import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email: string) =>
  axios.get(`http://localhost:4000/users/${email}`);

const fetchCoursesByChannelId = (channelId: any) =>
  axios.get(`http://localhost:4000/channels/${channelId}`);

const DependentQueriesPage = ({ email }: any) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;
  console.log({ channelId });
  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );
  return <div>{courses?.data.courses.map((course: any) => course)}</div>;
};

export default DependentQueriesPage;
