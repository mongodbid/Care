import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./data.css";
import { Spinner, Table } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";

const Data = () => {

    const [data, setData] = useState();
    useEffect(() => {

        const getData = async () => {
            const response = await fetch("https://care-khaki.vercel.app/get-data", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const resp = await response.json();
            if (!response.ok) {
                toast.error(resp.message);
                window.location.href = '/admin';
            }
            setData(resp ?resp:[]);
        }
        getData();
    }, [])

    return (<>{
        data ?
            <>

      <div className="theme" style={{margin:"1%",display:"flex",justifyContent:"flex-end"}}><ColorModeButton/></div>

                    
                <div className="tableData">
                    <Table.Root size="sm" className="task-table">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader className="header">Name</Table.ColumnHeader>
                                <Table.ColumnHeader className="header">Phone Numer</Table.ColumnHeader>
                                <Table.ColumnHeader className="header">Address</Table.ColumnHeader>
                                <Table.ColumnHeader className="header">City</Table.ColumnHeader>
                                <Table.ColumnHeader className="header">State</Table.ColumnHeader>
                                <Table.ColumnHeader className="header">Created Time</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.map((item, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell className="rows">{item.name}</Table.Cell>
                                    <Table.Cell className="rows">{item.phoneNumber}</Table.Cell>
                                    <Table.Cell className="rows">{item.address}</Table.Cell>
                                    <Table.Cell className="rows">{item.city}</Table.Cell>
                                    <Table.Cell className="rows">{item.state}</Table.Cell>
                                    <Table.Cell className="rows">{item.createdAt?.toString().slice(0, 10)}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>

                </div> </> : <div className="loading"><Spinner size="xl" /></div>}
                

    </>

    )
}

export default Data;