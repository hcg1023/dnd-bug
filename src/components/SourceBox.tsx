import type { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'
import { Table } from 'antd'

const style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

export interface BoxProps {
    name: string
}

interface DropResult {
    name: string
}

const columns = [
    {
        title: 'name',
        dataIndex: 'name'
    },
    {
        title: 'address',
        dataIndex: 'address'
    },
    {
        title: 'date',
        dataIndex: 'date'
    }
]

const tableData = [
    {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-08",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    // {
    //   date: "2016-05-06",
    //   name: "Tom",
    //   address: "No. 189, Grove St, Los Angeles",
    // },
    // {
    //   date: "2016-05-07",
    //   name: "Tom",
    //   address: "No. 189, Grove St, Los Angeles",
    // },
];

export const Box: FC<BoxProps> = function Box({ name }) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'BOX',
        item: {name},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    const opacity = isDragging ? 0.4 : 1
    return (
        <div ref={drag} style={{...style, opacity}} data-testid={`box`}>
            <Table
                columns={columns}
                dataSource={tableData}
                scroll={{y: 105} }
                pagination={{hideOnSinglePage: true} }
            >
        </Table>
        </div>
    )
}