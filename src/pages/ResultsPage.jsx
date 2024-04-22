import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { AlertPopUp } from '../components';

const ResultsPage = () => {

    const [data, setData] = useState(null);

    const toolbarOptions = ['Search', 'PdfExport', 'ExcelExport'];
    const FilterOptions = { type: 'Menu' };
  
    let grid; 
    const toolbarClick = (args) => {
      if (grid && args.item.id === 'grid_pdfexport') {
          grid.pdfExport();
      }
      if (grid && args.item.id === 'grid_excelexport') {
          grid.excelExport();
      }
    };

    const rowSelected = (args) => {
      if (grid) 
      {
        // Get the id and redirect to page/{id} route
        const selectedRecord = grid.getSelectedRecords();
        const target = args.target; // Get the element that triggered the function (checkbox or row selected)
        if (selectedRecord.length === 1 && target.classList.contains('e-selectionbackground')) // this means no checkboxes are ticked
        {
            const selectedRecordJSON = JSON.stringify(selectedRecord);
            const id = JSON.parse(selectedRecordJSON)[0].id;
            window.location.replace(`/results/${id}`);
        }
      }
    };

    useEffect(() => {
      async function fetchData() {
        await axios.get('http://127.0.0.1:5000/arm/api/results')
        .then((response) => {
          setData(response.data.success.data);
        })
        .catch((error) => {
          console.log(error);
          const message = `Error fetching results data: ${error}.`;
          <AlertPopUp message={message} isSuccess={false}/>
        })
      }
      fetchData();
    }, [])

    return (
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl border-solid border-1">
            <h1 className='mt-5 text-gray-950 text-3xl font-bold mb-5'>Association Rule Mining Results</h1>
            <GridComponent
              id="grid"
              dataSource={data}
              toolbar={toolbarOptions}
              allowPaging
              allowSorting
              allowFiltering
              filterSettings={FilterOptions}
              allowPdfExport={true}
              allowExcelExport={true}
              toolbarClick={toolbarClick}
              rowSelected={rowSelected}
              ref={g => grid = g}
            >              
                <ColumnsDirective>
                    <ColumnDirective field='id' headerText="Result ID" width='100'/>
                    <ColumnDirective field='algorithm' headerText="Algorithm" width='100'/>
                    <ColumnDirective field='date_added' headerText="Date Added" width='100'/>
                </ColumnsDirective>
                <Inject services={[ Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar ]}/>
            </GridComponent>
        </div>
    );
};

export default ResultsPage;