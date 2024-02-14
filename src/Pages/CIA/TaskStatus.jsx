import * as React from 'react'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import TaskStatusPopup from './TaskStatus/TaskStatusPopup'
import ListPage from '../../Components/ListPage/ListPage'

function TaskStatus() {
  const { setTitle, setSubtitle } = useTopbarContext()
  setTitle('List CIA Task Status')
  setSubtitle('You can view and manage all the List CIA Task Status here.')

  const columns = [
    { id: 'status', label: 'Task Status', align: 'left' },
    { id: 'lastupdatedby', label: 'Last updated By', align: 'left' },
    { id: 'lastupdateddate', label: 'Lastupdated Date', align: 'left' },
    { id: 'comment', label: 'Comment', align: 'left' },
  ]

  const [rows, setRows] = React.useState([
    {
      id: 1,
      status: 'Active',
      lastupdatedby: 'john silva',
      lastupdateddate: '2024-01-30',
      comment: 'This task is in active status',
    },
  ])

  const [openPopUp, setOpenPopup] = React.useState(false)
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
          rowsPerPage: 5,
          page: 0,
          count: 100,
          onPageChange: (e, page) => {
            console.log(page)
          },
          onRowsPerPageChange: (e) => {
            console.log(e.target.value)
          },
        }}
        disableSearchBar
      />
      <TaskStatusPopup openPopUp={openPopUp} setOpenPopup={setOpenPopup} />
    </>
  )
}

export default TaskStatus
