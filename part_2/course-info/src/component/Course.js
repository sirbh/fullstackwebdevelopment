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

const Total = ({ parts }) => {
  const total = parts.reduce((totalExc, part) => {
    totalExc = totalExc + part.exercises;
    return totalExc;
  });

  return <h4>total of {total} exercises</h4>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
