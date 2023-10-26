export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export async function request(url, options = {}) {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-type': 'application/json',
        'x-username': 'ikjun',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 호출 응답 이상');
  } catch (e) {
    alert(e.message);
  }
}

/* 데이터 구조
[
  {
    id: 1, // Document id
    title: '노션을 만들자', // Document title
    documents: [
      {
        id: 2,
        title: '블라블라',
        documents: [
          {
            id: 3,
            title: '함냐함냐',
            documents: [],
          },
          {
            id: 5,
            title: '함냐함냐2',
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'hello!',
    documents: [],
  },
];
*/
