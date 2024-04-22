import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search, Toolbar, DetailRow } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { AlertPopUp } from '../components';

const ResultPage = () => {

    const [data, setData] = useState(null);
    const [rulesData, setRulesData] = useState(null);

    // Getting the result ID from the route -> results/id
    let { id } = useParams();

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

    useEffect(() => {
      async function fetchData() {
        await axios.get(`http://127.0.0.1:5000/arm/api/results/${id}`)
        .then((response) => {
          console.log(response.data.success.data);
          setData(response.data.success.data);
          setRulesData(response.data.success.data.rules);
        })
        .catch((error) => {
          const message = `Error fetching result data: ${error}.`;
          <AlertPopUp message={message} isSuccess={false}/>
          console.log(error);
        })
      }
      fetchData();
    }, [])

    return (
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl border-solid border-1">
            <h1 className='mt-5 text-gray-950 text-3xl font-bold mb-5'>Result: {id}</h1>
            <GridComponent
              id="grid"
              dataSource={rulesData}
              toolbar={toolbarOptions}
              allowPaging
              allowSorting
              allowFiltering
              filterSettings={FilterOptions}
              allowPdfExport={true}
              allowExcelExport={true}
              toolbarClick={toolbarClick}
              ref={g => grid = g}
            >              
                <ColumnsDirective>
                    <ColumnDirective field='rule' headerText='Rule' width='300' textAlign="Left"/>
                    <ColumnDirective field='confidence' headerText='Confidence' width='100' textAlign="Left"/>
                    <ColumnDirective field='support' headerText='Support' width='100' textAlign="Left"/>
                    <ColumnDirective field='lift' headerText='Lift' width='100' textAlign="Left"/>
                    <ColumnDirective field='conviction' headerText='Conviction' width='150' textAlign="Left"/>
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Toolbar, Search]}/>
            </GridComponent>

        </div>
    );
};

export default ResultPage;