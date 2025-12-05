import type { ReactNode } from 'react';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
}

export const Table = <T extends { id: number }>({ 
  data, 
  columns, 
  loading = false 
}: TableProps<T>) => {
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-4 text-gray-500">No data found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th 
                key={String(column.key)} 
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((column) => (
                <td 
                  key={String(column.key)} 
                  className="px-4 py-2 text-sm text-gray-900 border-b"
                >
                  {column.render 
                    ? column.render(row[column.key], row)
                    : (() => {
                        const value = row[column.key];
                        if (value === null || value === undefined) return '-';
                        if (typeof value === 'object') {
                          // If it's an object, try to display a meaningful string
                          if ('name' in value) return String((value as { name: unknown }).name);
                          if ('id' in value) return `ID: ${(value as { id: unknown }).id}`;
                          return '[Object]';
                        }
                        return String(value);
                      })()
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
