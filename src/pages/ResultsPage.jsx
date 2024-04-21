import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import axios from 'axios';

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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:5000/arm/api/results');
            console.log(response);
            setData(response.success.data);
            console.log(data);
          } catch (error) {
            console.error('Error fetching results data: ', error);
          }
        };
    
        fetchData();
      }, []);

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
            >              
                <ColumnsDirective>
                    <ColumnDirective field='id' width='100'/>
                    <ColumnDirective field='rules.rule' width='100'/>
                    <ColumnDirective field='count' width='100'/>
                </ColumnsDirective>
                <Inject services={[ Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar ]}/>
            </GridComponent>
        </div>
    );
};

export default ResultsPage;