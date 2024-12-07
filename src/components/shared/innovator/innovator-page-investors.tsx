import Card from "../../layout/ui/card";
import ImageCarousal from "../../layout/ui/image-carousal";
export default function InnovatorPageInvestors({
  investorsProfile,
}: {
  investorsProfile: any;
}) {
  return (
    <Card styles="">
      <ImageCarousal>
        <Slide
          user={{
            imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
            name: "John Doe",
            category: "Technology",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos.",
          }}
        />
        <Slide
          user={{
            imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
            name: "John Doe",
            category: "Technology",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos.",
          }}
        />
      </ImageCarousal>
    </Card>
  );
}
function Slide({ user }: { user: any }) {
  return (
    <>
      <div className="flex p-12 border border-green rounded-lg">
        <div>
          <img src={user.imageUrl} alt={user.name} />
          <h1>{user.name}</h1>
        </div>
        <div>
          <h1>Investment Focus</h1>
          <p>{user.category}</p>
          <h1>Experience</h1>
          <p>{user.description}</p>
        </div>
      </div>
    </>
  );
}
