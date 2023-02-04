const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => {
      return <Part part={part} key={part.id} />;
    })}
  </>
);

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <h4>
        total of{" "}
        {course.parts.reduce((totalExc, part) => {
          totalExc = totalExc + part.exercises;
          return totalExc;
        }, 0)}{" "}
        exercises
      </h4>
    </>
  );
};

export default Course