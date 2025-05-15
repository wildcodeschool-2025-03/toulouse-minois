function About() {
  return (
    <main style={{ margin: "2vw" }}>
      <section>
        <h1> About our project</h1>
        <p>
          We are a team of three junior developers in full-stack web developer
          training at Wild Code School. Minois is a project related to our
          training where we use the React library and create dynamic interfaces
          that interact with a web API. This site is the design of an online
          gallery dedicated to the evolution of portraits throughout history. We
          worked as a team using Agile/Scrum methods and pooled our work through
          the use of GIT in a professional workflow. We hope that this project,
          which took less than a month, will satisfy people who are passionate
          about art and particularly fascinated by portraits.
        </p>
      </section>
      <section>
        <h2>Staff</h2>
        <article>
          <h3>Covarel Camille</h3>
          <img src="./src/Images/logoCamille.jpg" alt="Portrait Camille" />
          <p>Ta description ici</p>
        </article>
        <article>
          <h3>Bachimont Clément</h3>
          <img src="./src/Images/logoClement.jpg" alt="Portrait Clément" />
          <p>Ta description ici</p>
        </article>
        <article>
          <h3>Cayuela Annick</h3>
          <img src="./src/Images/PhotoLinkdn.jpg" alt="Portrait Annick" />
          <p>
            Hello, visitor. I'm Annick, 35 years old. I started learning about
            the world of web development a few months ago, and today I'm
            expanding my knowledge thanks to Wild Code School and one of our
            projects, Minois. I hadn't imagined how vast and enriching the world
            of development was. Through Minois, I hope you'll appreciate the
            features we've implemented and enjoy learning a little more about
            the fascinating world of portraits. Don't hesitate to write to me
            via my Linkdin
          </p>
        </article>
      </section>
      <div>
        <p>Nos liens réseaux</p>
        <img
          src="./src/Images/LinkedIn_logo_initials.png"
          alt="Logo Linkedin"
        />
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/camillecelestecovarel/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Covarel Camille (LinkedIn)
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/cl%C3%A9ment-bachimont-53822b277/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bachimont Clément (LinkedIn)
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/annick-cayuela-ikay/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cayuela Annick (LinkedIn)
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
export default About;
