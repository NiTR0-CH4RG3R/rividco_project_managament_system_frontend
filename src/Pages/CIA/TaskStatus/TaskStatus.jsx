import * as React from 'react'
import { useTopbarContext } from '../../../Contexts/TopbarContext'
import TaskStatusPopup from './TaskStatusPopup'
import ListPage from '../../../Components/ListPage/ListPage'
import * as taskStatusService from '../../../services/taskStatusService'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
//import * as systemUserService from '../../../services/systemUserService'

const columns = [
  { id: 'status', label: 'Task Status', align: 'left' },
  { id: 'lastUpdatedBy', label: 'Last Updated By', align: 'left' },
  { id: 'lastUpdatedDateTime', label: 'Last Updated Date', align: 'left' },
  { id: 'comments', label: 'Comment', align: 'left' },
]

function TaskStatus() {
  const { setTitle, setSubtitle } = useTopbarContext()
  setTitle('CIA Task Status List')
  setSubtitle('You can view and manage Statuses of a CIA task here.')

  const [openPopUp, setOpenPopup] = useState(false)
  const [statusId, setStatusId] = useState(null)
  const [modeType, setModeType] = useState()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { id } = useParams()

  const [rows, setRows] = React.useState([
    {
      status: 'Loading...',
      lastUpdatedBy: 'Loading...',
      lastUpdatedDateTime: 'Loading...',
      comments: 'Loading...',
    },
  ])

  useEffect(() => {
    setPage(0)
    setRowsPerPage(5)
  }, [])

  useEffect(() => {
    taskStatusService
      .listTaskStatus(id, page + 1, rowsPerPage)
      .then((taskstatus) => {
        setRows(taskstatus)
        /* Promise.all(
          taskstatus.map((item) =>
            systemUserService.getSystemUser(item.lastUpdatedBy)
          )
        ).then((results) => {
          setRows(
            taskstatus.map((item, index) => ({
              status: item.status,
              lastUpdatedBy: results[index].firstName,
              lastUpdatedDateTime: item.lastUpdatedDateTime,
              comments: item.comments,
            }))
          )
        }) */
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id, page, rowsPerPage, openPopUp])

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
          setModeType('view')
          setStatusId(id)
          setOpenPopup(true)
        }}
        onAddButtonClick={(e) => {
          setModeType('add')
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
      <TaskStatusPopup
        openPopUp={openPopUp}
        setOpenPopup={setOpenPopup}
        statusId={statusId}
        type={modeType}
      />
    </>
  )
}

export default TaskStatus
