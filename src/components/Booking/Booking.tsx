import { useState, useRef } from "react";
import ScheduleTable from "../ScheduleTable/ScheduleTable";
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';

function Booking() {
  const chartRef = useRef<any>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  

  const handleClose = () => {
    setShowConfirmationDialog(false);
    setSelectedTable(null);
    
    // Deselect all tables
    chartRef.current?.deselectObjects(chartRef.current?.selectedObjects);
    
    console.log(chartRef);
  };
  
  const handleSelect = (selectedObject: any) => {
    console.log('Selected Object:', selectedObject);
    
    if (selectedObject.objectType && selectedObject.objectType.toLowerCase() === 'table') {
      // Deselect all tables if another table is selected
      if (selectedTable && selectedTable !== selectedObject.label) {
        console.log('Deselecting All Tables');
        handleClose();
      }
      
      // Select the table if it's not already selected
      if (selectedTable !== selectedObject.label) {
        console.log('Selecting Table');
        setShowConfirmationDialog(true);
        setSelectedTable(selectedObject.label);
      }
    }
  };

  function handleSubmit(selectedDates,selectedTime){
    console.log(selectedDates)
    console.log(selectedTime)

    chartRef.current?.deselectObjects(chartRef.current?.selectedObjects);
    console.log(selectedTable)
  }


  
  return (
    <div style={{ height: '550px', margin: "8rem 0" }}>
    
    <SeatsioSeatingChart
    workspaceKey= {import.meta.env.VITE_PUBLIC_WORKSPACE}
    event= {import.meta.env.VITE_EVENT_KEY}
    region= {import.meta.env.VITE_SEATSIO_REGION}
    onRenderStarted={(createdChart) => { chartRef.current = createdChart; }}
    onObjectClicked={handleSelect}
    />
    
    {selectedTable && (
      <ScheduleTable
      open={showConfirmationDialog}
      onClose={handleClose}
      tableLabel={selectedTable}
      onSubmit = {handleSubmit}
      />
      )}
      </div>
      );
    };
    
    export default Booking;