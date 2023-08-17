'use client';

import {
  InnerSection,
  SectionContainer
} from '@/components/molecules/share/share.styles';
import {
  InfoTable,
  InfoTableContainer,
  InfoTitle,
  TableBody,
  TableHeader
} from '@/app/page/info/Info.styles';
import { tableInfoData } from '@/app/page/info/const';

export default function InfoPage() {
  return (
    <SectionContainer bgUrl={'/img/info_bg.jpg'}>
      <InnerSection>
        <InfoTitle>예배안내</InfoTitle>
        <InfoTableContainer>
          {tableInfoData.map(({ idx, header, colspan, body }) => (
            <InfoTable key={idx}>
              <TableHeader>
                <tr>
                  <th colSpan={colspan}>{header}</th>
                </tr>
              </TableHeader>
              <TableBody>
                {body.map((columns, rowIdx) => (
                  <tr key={rowIdx}>
                    {columns.map(
                      ({ column, rowSpan }, columnIdx) =>
                        column && (
                          <td key={columnIdx} rowSpan={rowSpan}>
                            {column}
                          </td>
                        )
                    )}
                  </tr>
                ))}
              </TableBody>
            </InfoTable>
          ))}
        </InfoTableContainer>
      </InnerSection>
    </SectionContainer>
  );
}
