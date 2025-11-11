import { useState } from 'react';

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const contents = [
    {
      id: 1,
      title: 'What is Github and how does it work?',
      content:
        'GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you’re just getting started with GitHub, you may know us best as a place for version control and collaboration.',
    },
    {
      id: 2,
      title: "How do I see GitHub's availability?",
      content: 'Check our real-time status report',
    },
    {
      id: 3,
      title: 'Why is GitHub so popular?',
      content:
        'GitHub is built by developers for developers, and we’re proud to be home to the world’s largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.',
    },
  ];

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {contents.map((content, index) => {
        return (
          <div key={content.id}>
            <ul>
              <h2
                onClick={() => {
                  handleClick(index);
                }}
              >
                {content.title} {openIndex === index ? '-' : '+'}
              </h2>
              {openIndex === index ? <p>{content.content}</p> : ''}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
