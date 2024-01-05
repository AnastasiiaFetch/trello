import axios from 'axios';

export const getUser = () => {
  return {
    data: {
      user: {
        id: 'ssdsdsdf',
        accountType: 'admin',
        firstName: 'Anastasiia',
        lastName: 'Fetch',
        email: 'fetch.ana22@gmail.com',
        userPhoto: null,
      },
    },
  };
};

export const getAllWorkSpaces = () => {
  return {
    data: {
      workspaces: [
        {
          id: '1',
          name: 'Основний проект',
          workspaceType: 'Розробка та IT',
          description: 'Це наш основний проект для розробки ',
          members: [
            {
              id: '101',
              name: 'Іван Іванов',
              role: 'Розробник',
            },
            {
              id: '102',
              name: 'Марія Петренко',
              role: 'Дизайнер',
            },
          ],
        },
        {
          id: '2',
          name: 'Проект QA',
          workspaceType: 'Розробка та IT',
          description: 'Проект для тестування та вдосконалення продукту',
          members: [
            {
              id: '201',
              name: 'Олег Сидоров',
              role: 'Тестувальник',
            },
            {
              id: '202',
              name: 'Наталія Коваленко',
              role: 'Аналітик',
            },
          ],
        },
      ],
    },
  };
};

export const getAllBoards = () => {
  return {
    data: {
      boards: [
        {
          id: '1',
          name: 'Основна дошка',
          description: 'Основна дошка для головного проекту',
          workspaceId: '1',
          isSelected: true,
          createdAt: '2023-01-15T10:30:00',
          color: '#9765F4',
        },
        {
          id: '2',
          name: 'QA дошка',
          description: 'Дошка для тестування та вдосконалення продукту',
          workspaceId: '2',
          isSelected: false,
          createdAt: '2023-02-05T14:45:00',
          color: '#e74c3c',
        },
        {
          id: '3',
          name: 'Дошка ідей',
          description: 'Дошка для збору та обговорення нових ідей',
          workspaceId: '1',
          isSelected: false,
          createdAt: '2023-03-20T09:15:00',
          color: '#2ecc71',
        },
        {
          id: '4',
          name: 'Дошка PM',
          description: 'Дошка для обговорення нових ідей',
          workspaceId: '1',
          isSelected: false,
          createdAt: '2023-03-20T09:16:00',
          color: '#2ecc71',
        },
      ],
    },
  };
};

export const getBoard = (id: string) => {
  return {
    data: {
      id: id,
      name: 'Основна дошка',
      description: 'Основна дошка для головного проекту',
      workspaceId: '1',
      isSelected: true,
      createdAt: '2023-01-15T10:30:00',
      color: 'white',
      lists: [
        {
          id: 'list1',
          title: 'To Do',
          boardId: '1',
        },
        {
          id: 'list2',
          title: 'In Progress',
          boardId: '1',
        },
        {
          id: 'list3',
          title: 'Done',
          boardId: '1',
        },
      ],
      cards: [
        {
          id: 'card1',
          title: 'Task for team to complete by the end of the week',
          description: 'Complete task 1 by the end of the week.',
          listId: 'list1',
          order: 1,
        },
        {
          id: 'card2',
          title: 'Task 2',
          description: 'Review documentation for Task 2.',
          listId: 'list1',
          order: 2,
        },
        {
          id: 'card3',
          title: 'Task 3',
          description: 'Implement feature X in the application.',
          listId: 'list2',
          order: 1,
        },
        {
          id: 'card4',
          title: 'Task 4',
          description: 'Prepare final report for Project A.',
          listId: 'list3',
          order: 1,
        },
        {
          id: 'card5',
          title: 'Task 5',
          description: 'Prioritize tasks for the upcoming sprint.',
          listId: 'list1',
          order: 3,
        },
      ],
    },
  };
};

export const getCard = (id: string) => {
  return {
    data: {
      id: id,
      title: 'How to use this list',
      checklists: [
        {
          key: 'List',
          items: [
            {
              value: 'Task1',
              isChecked: true,
              id: 'dbd465bc-5f75-4e1b-89cd-65967f3e9afa',
            },
          ],
        },
      ],
      description:
        "<p>For each meeting, there will be someone's face on the \"meeting lead\" card. They're in charge of wrangling any last minute attendees (messaging them if they're not there), running the meeting, making sure we cover everything on the cards, keeping us all on topic, and tabling conversations for auxiliary/follow up meetings if they run long.</p>",
    },
  };
};
