import { component$ } from "@builder.io/qwik";
import { Video } from "~/components/shared/video";

export default component$(() => {
  // videos to learn english with movies like puss in boots, shrek, etc.
  const videos = [
    {
      title: "Puss in Boots",
      description:
        "Puss in Boots is a 2011 American computer-animated adventure-comedy film produced by DreamWorks Animation and distributed by Paramount Pictures.",
      image:
        "https://th.bing.com/th/id/R.986b73b2d382d489f9db70ff0bdbe50b?rik=iz07QWp4fQ4TWA&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f33100000%2fPuss-in-Boots-The-Three-Diablos-puss-in-boots-33184292-1920-1080.jpg&ehk=Gpw1bNTioK0W55xEOXWcH%2bpOgJFtBNPQScFLfxNK%2blM%3d&risl=&pid=ImgRaw&r=0",
      video: "https://youtu.be/DHHCoIYOtGA?si=QZ8c-GqTrhSeyXBI",
    },
    {
      title: "Toy Story",
      description:
        "Un grupo de juguetes cobran vida cuando no hay humanos alrededor.",
      image:
        "https://th.bing.com/th/id/R.acfe537f1d4cf220c5d2e496a4b42f58?rik=q%2fIs7R19lXjR9Q&riu=http%3a%2f%2f4.bp.blogspot.com%2f_W1ueYt1O3xs%2fS8MMdDv632I%2fAAAAAAAAUP8%2f1XoHxVfnrbM%2fd%2ftoy+story+3+(2).jpg&ehk=Ms0V3V0%2fvIYzHDbqYGWkycsydhrf9zxEutyWkDR9GMw%3d&risl=1&pid=ImgRaw&r=0",
      video: "https://www.youtube.com/watch?v=CxwTLktovTU",
    },
    {
      title: "A Bug's Life",
      description:
        "Una hormiga inventiva y un grupo de insectos guerreros defienden su colonia de una banda de saltamontes.",
      image:
        "https://th.bing.com/th/id/R.90e1021b7060200905b85c68fe0be67f?rik=1b%2boCTFVEXV5cg&pid=ImgRaw&r=0",
      video: "https://www.youtube.com/watch?v=mE35XQFxbeo",
    },
    {
      title: "Finding Nemo",
      description:
        "Un pez payaso llamado Marlin vive una gran aventura para rescatar a su hijo Nemo.",
      image:
        "https://www.slantmagazine.com/wp-content/uploads/2013/06/film_findingnemo.jpg",
      video: "https://www.youtube.com/watch?v=9oQ628Seb9w",
    },
    {
      title: "Monsters, Inc.",
      description:
        "Sulley y su asistente Mike trabajan en Monsters, Inc., donde asustan a los niños para generar energía.",
      image:
        "https://th.bing.com/th/id/R.c03aa173416fa4b1534eb4d560319400?rik=ZY%2bsQhg%2b47WQ0g&riu=http%3a%2f%2fwww.dadcraft.com%2fwp-content%2fuploads%2f2016%2f04%2fIncorporated-Monsters.jpg&ehk=av6ggaWLaacMtn1vgrmqdUJJw%2fUBzrYS4yhLQaM71xM%3d&risl=1&pid=ImgRaw&r=0",
      video: "https://www.youtube.com/watch?v=CGbgaHoapFM",
    },
  ];
  return (
    <main>
      <section class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <Video
            title={video.title}
            description={video.description}
            image={video.image}
            key={video.title}
            video={video.video}
          />
        ))}
      </section>
    </main>
  );
});
