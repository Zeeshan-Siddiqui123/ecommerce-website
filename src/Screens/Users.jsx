import React, { useEffect, useState } from 'react'
import { useGetUsersQuery } from '../store/features/api.slice'
import { Spin, Alert, Table } from 'antd';
import { Link } from 'react-router-dom';

const Users = () => {
    const [columns, setColumns] = useState([]);
    const { data, error, isLoading, isSuccess, isError, refetch } = useGetUsersQuery()
    // console.log({ data, error, isLoading, isSuccess, isError, });

    useEffect(() => {
        if (data) {
            // console.log(Object.keys(data[0]));

            const columns = Object.keys(data[0]).map((key) => {

                if (key === 'company') {
                    return {
                        title: key.toUpperCase(),
                        dataIndex: key,
                        key: key,
                        render: function (value, record, index) {
                            // console.log({ value, record, index });

                            // return `${value.name} - ${value.bs}`;
                            return value.name;
                        }
                    }
                }
                if (key === 'address') {
                    return {
                        title: key.toUpperCase(),
                        dataIndex: key,
                        key: key,
                        render: function (value, record, index) {
                            // console.log({ value, record, index });
                            return <h4>{value.street} - {value.zipcode}</h4>
                        }
                    }
                }
                return {
                    title: key.toUpperCase(),
                    dataIndex: key,
                    key: key,
                }
            }
            );
            columns.push({
                title: 'POSTS',
                key: 'posts',
                render: (value, record, index) => {
                    // console.log(value, record, index);
                    return <Link to={`/posts?userId=${record.id}`}>Posts</Link>;
                }
            }, )
            setColumns(columns)
        }
    }, [data])


    // if (isLoading) {
    //     return <Spin size="large" />
    // } 
    if (error) {
        return <Alert
            message={"Error"}
            description={error}
            type="error"
            closable
        />
    }
    return (
        <Table className='mt-16'
            columns={columns}
            dataSource={data}
            bordered
            rowKey={(record) => {
                return record.id
            }}

            loading={isLoading}
            pagination={false}
        />
    )
}

export default Users
