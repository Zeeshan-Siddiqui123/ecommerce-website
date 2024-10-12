import React, { useEffect, useState } from 'react'
import { useAddPostMutation, useDeletePostMutation, useGetPostsQuery, useLazyGetCommentsQuery, useLazyGetPostsQuery, useUpdatePostMutation } from '../store/features/api.slice'
import { Alert, Table, Button, Modal } from 'antd';
import { useSearchParams } from 'react-router-dom';

const generateColumns = (object) => {
    const columns = Object.keys(object).map((key) => {
        return {
            title: key.toUpperCase(),
            dataIndex: key,
            key: key,
        }
    });
    // console.log(columns, object);

    return columns
}
const PER_PAGE = 5;
const Posts = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [columns, setColumns] = useState([]);
    const userId = searchParams.get("userId");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(PER_PAGE)

    // const { data, error, isLoading, isSuccess, isError, refetch } = useGetPostsQuery(userId ? `?userId=${userId}` : '')
    const [getPosts, { data, error, isLoading, isSuccess, isError }] = useLazyGetPostsQuery()
    const [getComments, { data: commentsData, error: commentsError, isLoading: commentsIsLoading, isSuccess: commentsIsSuccess, isError: commentsIsError }] = useLazyGetCommentsQuery()
    const [addPost, { data: postData, error: postError, isLoading: postIsLoading, isSuccess: postIsSuccess, isError: postIsError }] = useAddPostMutation()
    const [updatePost,] = useUpdatePostMutation()
    const [deletePost,] = useDeletePostMutation()
          
    useEffect(() => {
        getPosts(`?_page=${currentPage}&_per_page=${pageSize}${userId ? `&userId=${userId}` : ''}`)
    }, [userId, currentPage, pageSize])

    useEffect(() => {
        if (data) {
            
            const columns = generateColumns(data?.data[0]);
            if (userId) {
                columns.push({
                    title: 'ACTIONS',
                    key: 'actions',
                    render: (record) =>
                        <div style={{ display: "flex", gap: '1rem' }}>
                            <Button onClick={() => {
                                console.log(record, 'record');
                                updatePost({ ...record, body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." })
                            }} color="default" variant="solid">Update</Button>
                            <Button type="primary" onClick={() => {
                                const areYouSure = confirm(`Are you sure you want to delete this post with id ${record.id}?`)
                                if (areYouSure) {
                                    deletePost(record.id)
                                }
                            }} danger>Delete</Button>
                        </div>
                })
            }
            setColumns([...columns, {
                title: 'COMMENTS',
                key: 'comments',
                render: (value) => {
                    return <Button type="primary" size='middle' onClick={() => {
                        showModal();
                        getComments(`?postId=${value.id}`)
                    }}>View Comments</Button>;
                }
            },])
        }
    }, [data])


    const showModal = () => {
        setIsModalOpen(true);
    };


    const hideModal = () => {
        setIsModalOpen(false);
    };

    const onChange = (page) => {
        console.log({ page });
        setCurrentPage(page);
    };

    const onShowSizeChange = (current, size) => {
        console.log({ current, size });
        setPageSize(size);
    };


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
    } console.log(userId, 'userId');
    console.log(data, 'data');

    return (
        <>
           <div className='mt-[80px]'>
           {userId &&
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", margin: '1rem 0' }} >
                    <Button type="primary" onClick={() => {
                        // openModal();
                        addPost({
                            "userId": userId,
                            "title": "Post 101",
                            "body": "Bosy 101"
                        });
                        // refetch()
                    }} loading={postIsLoading}>Create Post</Button>
                </div>
            }
            <Table bordered rowKey={(record) => record.id} dataSource={data?.data} loading={isLoading} columns={columns}
                pagination={{
                    total: data?.items || 0,
                    current: currentPage,
                    onChange: onChange,
                    pageSize: pageSize,
                    onShowSizeChange: onShowSizeChange,
                    hideOnSinglePage: true,
                    showTotal: (total) => `Total ${total} posts`

                }}
            />
            <Modal width={1000} title="Comments" open={isModalOpen} onOk={hideModal} onCancel={hideModal}>
                <Table bordered rowKey={(record) => record.id} dataSource={commentsData} loading={commentsIsLoading} columns={generateColumns(commentsData?.length > 0 && commentsData[0])} pagination={false} />
            </Modal>
           </div>
        </>
    )
}

export default Posts
