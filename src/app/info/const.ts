interface TableBody {
  column?: string;
  rowSpan?: number;
}

interface TableInfo {
  idx: number;
  header: string;
  colspan: number;
  body: TableBody[][];
}

export const tableInfoData: TableInfo[] = [
  {
    idx: 0,
    header: '예배시간 안내',
    colspan: 3,
    body: [
      [
        { column: '주일예배', rowSpan: 2 },
        { column: '주일 오전 11시' },
        { column: '본당' }
      ],
      [{ column: undefined }, { column: '주일 오후 2시' }, { column: '본당' }],
      [{ column: '새벽기도' }, { column: '새벽 5시 30분' }, { column: '본당' }],
      [
        { column: '수요예배' },
        { column: '수요일 저녁 8시' },
        { column: '본당' }
      ],
      [
        { column: '금요예배' },
        { column: '금요일 저녁 8시' },
        { column: '본당' }
      ]
    ]
  },
  {
    idx: 1,
    header: '교육부서',
    colspan: 3,
    body: [
      [
        { column: '영유아부' },
        { column: '주일 오전 9시' },
        { column: '교육관' }
      ],
      [{ column: '유치부' }, { column: '주일 오전 9시' }, { column: '교육관' }],
      [{ column: '유년부' }, { column: '주일 오전 9시' }, { column: '교육관' }],
      [{ column: '초등부' }, { column: '주일 오전 9시' }, { column: '교육관' }],
      [
        { column: '중고등부' },
        { column: '주일 오전 9시' },
        { column: '교육관' }
      ],
      [{ column: '청년부' }, { column: '주일 오후 4시' }, { column: '교육관' }]
    ]
  }
];
