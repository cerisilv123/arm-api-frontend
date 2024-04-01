/**
 * UploadPage Component for uploading transactional datasets.
 * 
 * Allows users to upload datasets via CSV or Excel files, select between FP-Growth and Apriori
 * algorithms, and set confidence and support thresholds for association rule mining analysis.
 * 
 * Functions:
 * - handleFileInput: Parses Excel/CSV files into array data using PapaParse (for CSV) and XLSX (for Excel).
 * - handleSubmit: Submits parsed data and parameters to backend API with axios.
 * 
 * Libraries: React, PapaParse, XLSX, axios.
 * 
 * Usage: Component for data upload and analysis parameter configuration in data mining applications.
 * 
 * @requires React, PapaParse, XLSX, axios
 */
import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ResultsPage = () => {

    const [transactions, setTransactions] = useState('');
    const [algorithm, setAlgorithm] = useState('');
    const [supportThreshold, setSupportThreshold] = useState('');
    const [confidenceThreshold, setConfidenceThreshold] = useState('');

    // Handler for submitting the form data to ARM API using axios
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            "transactions": transactions,
            "algorithm": algorithm,
            "support_threshold": parseFloat(supportThreshold),
            "confidence_threshold": parseFloat(confidenceThreshold),
        };

        console.log(data);

        axios.post('http://localhost:5000/arm/api/mine', data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log("Error making POST request: ", error);
          });
    };

    // Handler for converting parsing uploaded files into arrays (CSV & Excel)
    const handleFileInput = (event) => {
        console.log(event.target)
        const file = event.target.files[0];
        if (file.type === "text/csv") {
            // Handle CSV file
            Papa.parse(file, {
                complete: function(results) {
                    const data = results.data; 
                    const cleanedData = data.map(row => 
                        row.filter(item => item !== null && item !== undefined && item !== '')
                    );
                    console.log("Parsed CSV data: ", cleanedData);
                    setTransactions(cleanedData);
                },
                error: function(err) {
                    console.error("Error parsing the CSV file data: ", err);
                }
            });
        } else {
            // Handle Excel file
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const workbook = XLSX.read(e.target.result, {type: 'binary'});
                    const firstSheet = workbook.SheetNames[0]; // Accesses the first page in an excel workbook
                    const sheet = workbook.Sheets[firstSheet];
                    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    const cleanedData = data.map(row => 
                        row.filter(item => item !== null && item !== undefined && item !== '')
                    );
                    console.log("Excel data:", cleanedData);
                    setTransactions(cleanedData);
                } catch (error) {
                    console.log("Error parsing excel file: ", error)
                }
            };
            reader.onerror = (errorEvent) => {
                console.error("Error reading excel file with FileReader: ", reader.error);
            };
            reader.readAsBinaryString(file); // onload event is triggered when this completes
        }
    };

    return (
        <div>
        <h1 className='mt-5 text-gray-950 text-3xl font-bold'>Upload data set</h1>
        <p className='mt-5 text-gray-950 text-sm font-medium'>Upload your transactional data set in CSV or Excel format to analyse it using popular Association Rule Mining algorithms (FP-Growth and Apriori). Specify your confidence and support thresholds to uncover meaningful associations within your data. you can uncover rules that reveal how certain items are connected. This can help you make informed decisions about which items to sell together.</p>
        <form className='mt-7' onSubmit={handleSubmit}>
            <div>
            <label className='font-semibold' htmlFor="dataFile">Upload a file in CSV or XLS format:</label><br/>
            <input 
                className='mt-2'
                type="file"
                id="dataFile"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileInput}
            /><br/>
            </div>
            <div className='mt-7'>
            <label className='text-gray-950 font-semibold'>Select Algorithm:</label><br/>
            <label className='text-gray-950 font-normal'>
                <input
                className='mt-2'
                type="radio"
                value="fpgrowth"
                checked={algorithm === 'fpgrowth'}
                onChange={() => setAlgorithm('fpgrowth')}
                /> FP-Growth
            </label><br/>
            <label className='text-gray-950 font-normal'>
                <input
                type="radio"
                value="apriori"
                checked={algorithm === 'apriori'}
                onChange={() => setAlgorithm('apriori')}
                /> Apriori
            </label><br/>
            <label className='text-gray-950 font-normal'>
                <input
                type="radio"
                value="apriori-ceri"
                checked={algorithm === 'apriori-ceri'}
                onChange={() => setAlgorithm('apriori-ceri')}
                /> AprioriCeri
            </label>
            </div>
            <div className='mt-7'>
            <label className='font-semibold' htmlFor="supportThreshold">Support Threshold: </label>
            <input
                type="number"
                id="supportThreshold"
                value={supportThreshold}
                onChange={(e) => setSupportThreshold(e.target.value)}
                placeholder="Enter value"
            />
            </div>
            <div className='mt-2'>
            <label className='font-semibold' htmlFor="confidenceThreshold">Confidence Threshold: </label>
            <input
                type="number"
                id="confidenceThreshold"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(e.target.value)}
                placeholder="Enter value"
            />
            </div>
            <button className="mt-5 px-6 py-2 border border-transparent text-md font-semibold rounded-md text-white bg-gray-950 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" type="submit">Mine rules</button>
        </form>
        </div>
    );
};

export default ResultsPage;