import React from 'react'
import ListPage from '../../Components/ListPage/ListPage';
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import * as taskResourceService from '../../services/taskResourceService'
import { AppRoutes } from '../../Data/AppRoutes';

const columns = [
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'url', label: 'File Link', align: 'left' },
  { id: 'comments', label: 'Comment', align: 'left' },
  { id: 'lastUpdatedBy', label: 'Added By', align: 'left' },
  { id: 'lastUpdatedDateTime', label: 'Added Date' },
];

function TaskResourceList() {

  const { setTitle, setSubtitle } = useTopbarContext()
  setTitle('CIA Task Resource List')
  setSubtitle('You can view CIA Task Resource details here.')

  // const [ResourceId, setResourceId] = useState(null)
  // const [modeType, setModeType] = useState()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { id } = useParams()
  const navigate = useNavigate()
  
    const [rows, setRows] = React.useState([
      {
        category: 'Image',
        url: 'Test',
        comments: 'This taskResorce',
        lastUpdatedBy: 'john silva',
        lastUpdatedDateTime: '2024-01-30',
      },
    ])
  
    useEffect(() => {
      setPage(0)
      setRowsPerPage(5)
    }, [])
  
    useEffect(() => {
      taskResourceService
        .listTaskResourceService(id, page + 1, rowsPerPage)
        .then((taskresource) => {
          setRows(taskresource)
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
          searchBy: 'category',
          onSearchChange: (e) => {
            console.log(e.target.value)
          },
          onSearchClick: (e) => {},
        }}
        onRowClick={(e, id) => {
          // setModeType('view')
          // setResourceId(id)
        }}
        onAddButtonClick={(e) => {
          navigate(AppRoutes.cia_resources_add.path)
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
    </>
  )
}

export default TaskResourceList