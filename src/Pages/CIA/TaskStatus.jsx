import * as React from 'react'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import TaskStatusPopup from './TaskStatus/TaskStatusPopup'
import ListPage from '../../Components/ListPage/ListPage'
import * as taskStatusService from '../../services/taskStatusService'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

function TaskStatus() {
  const { setTitle, setSubtitle } = useTopbarContext()
  setTitle('List CIA Task Status')
  setSubtitle('You can view and manage all the List CIA Task Status here.')

  const [openPopUp, setOpenPopup] = React.useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { id } = useParams()

  const columns = [
    { id: 'status', label: 'Task Status', align: 'left' },
    { id: 'lastUpdatedBy', label: 'Last updated By', align: 'left' },
    { id: 'lastUpdatedDate', label: 'Lastupdated Date', align: 'left' },
    { id: 'comments', label: 'Comment', align: 'left' },
  ]

  const [rows, setRows] = React.useState([
    {
      status: 'Active',
      lastUpdatedBy: 'john silva',
      lastUpdatedDateTime: '2024-01-30',
      comments: 'This task is in active status',
    },
  ])

  useEffect(() => {
    setPage(0)
    setRowsPerPage(5)
  }, [])

  useEffect(() => {
    taskStatusService
      .listTaskStatus(page + 1, rowsPerPage)
      .then((taskstatuses) => {
        setRows(taskstatuses)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id, page, rowsPerPage])

  return (
    <>
      <ListPage
        columns={columns}
        rows={rows}
        searchBarProps={{
          searchBy: 'location',
          onSearchChange: (e) => {
            console.log(e.target.value)
          },
          onSearchClick: (e) => {},
        }}
        onRowClick={(e, id) => {
          console.log(id)
        }}
        onAddButtonClick={(e) => {
          setOpenPopup(true)
        }}
        tablePaginationProps={{
          rowsPerPageOptions: [5, 10, 25, 100],
          component: 'div',
          rowsPerPage: rowsPerPage,
          page: page,
          count: -1,
          onPageChange: (e, page) => {
            setPage(page)
          },
          onRowsPerPageChange: (e) => {
            setRowsPerPage(e.target.value)
          },
        }}
        disableSearchBar
      />
      <TaskStatusPopup openPopUp={openPopUp} setOpenPopup={setOpenPopup} />
    </>
  )
}

export default TaskStatus
