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
          description: 'Це наш основний проект для розробки',
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
          color: '#3498db',
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
      id: '1',
      name: 'Основна дошка',
      description: 'Основна дошка для головного проекту',
      workspaceId: '1',
      isSelected: true,
      createdAt: '2023-01-15T10:30:00',
      color: 'white',
    },
  };
};
