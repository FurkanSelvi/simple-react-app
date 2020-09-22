import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getPromise } from '../../helpers/Api'
import Loading from '../../components/Loading'
import { useStyles } from '../../components/Layout/data'

const useStyles2 = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const TablePage = () => {
    const classes = useStyles();
    const classes2 = useStyles2();
    const [data, setData] = useState({ items: [], loading: true })

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        setData({ items: [], loading: true })
        getPromise('/v1/employees', {}, 'http://dummy.restapiexample.com/api').then(r => {
            setData({ items: r?.data || [], loading: false })
        }).catch(e => {
            setData({ items: [], loading: false })
            console.log(e, 'table err')
        });
    }

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Loading loading={data.loading}>
                <TableContainer component={Paper}>
                    <Table className={classes2.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>name</TableCell>
                                <TableCell align="right">Salary</TableCell>
                                <TableCell align="right">Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.items.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.employee_name}
                                    </TableCell>
                                    <TableCell align="right">{row.employee_salary}</TableCell>
                                    <TableCell align="right">{row.employee_age}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Loading>
        </main>
    );
}
