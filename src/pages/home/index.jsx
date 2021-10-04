import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import Dialog from "../../components/dialog";
import Grid from "../../components/grid";
import Table from "../../components/table";
import { deleteCookie, getCookie } from "../../utils/cookies";
import { storage } from "../../utils/firebase";
import './style.css';

const headers = [
    { label: 'Upvotes', dataKey: 'upvotes', width: 120 },
    { label: 'Title', dataKey: 'title', width: 200 },
    { label: 'Description', dataKey: 'description', width: 350 },
    { label: 'Tags', dataKey: 'tags', width: 380 },
    { label: 'Created On', dataKey: 'createdon', width: 220 }
];

const Home = () => {

    const [showDialog, setShowDialog] = useState(false);
    const [data, setData] = useState([]);
    const history = useHistory();
    const firebase = useMemo(() => new storage(), []);
    const empId = getCookie('hack_auth_cookie');

    useEffect(() => {
        firebase.readData('challenges')
            .then((res) => setData(res.data || []))
            .catch((err) => console.log(err));
    }, [firebase]);

    const logOut = () => {
        deleteCookie('hack_auth_cookie');
        history.push('/login');
    }

    const handleChallengeCreate = (title, description, tags) => {
        const newData = {
            title,
            description,
            tags,
            createdon: new Date(),
            upvotes: 0,
            upvotedBy: []
        }
        firebase.writeData('challenges', {
            data: [
                ...data,
                newData
            ]
        })
            .then(() => setData([...data, {
                ...newData,
                createdon: { seconds: Math.round(newData.createdon / 1000) }
            }]))
            .catch(err => console.log(err))
            .finally(() => setShowDialog(false));
    }

    const handleUpvote = (rowData) => {
        const newData = data.map(row => {
            if (row.createdon.seconds === rowData.createdon.seconds) {
                let upvotes = row.upvotes;
                let upvotedBy = Array.from(row.upvotedBy);
                if (row.upvotedBy.includes(empId)) {
                    upvotes -= 1;
                    upvotedBy = upvotedBy.filter(id => id !== empId);
                } else {
                    upvotes += 1;
                    upvotedBy.push(empId);
                }

                return {
                    ...row,
                    upvotes,
                    upvotedBy
                }
            }
            return row;
        });
        firebase.writeData('challenges', {
            data: [...newData]
        })
            .then(() => setData([...newData]))
            .catch(err => console.log(err));
    }

    return (
        <Grid container>
            <Grid xs={8}>
                <h1 className='app__header'>Hack Ideas</h1>
            </Grid>
            <Grid xs={4}>
                <button
                    onClick={logOut}
                    className="button-icon icon-user app__logout tooltip"
                    type="button">
                    <span className="tooltiptext">Logout</span>
                </button>
            </Grid>
            <Grid xs={12}
                className='app__table-container'>
                <Table
                    data={data}
                    headers={headers}
                    handleUpvote={handleUpvote}
                />
            </Grid>
            {showDialog ?
                <Dialog
                    onClose={() => setShowDialog(false)}
                    onCreate={handleChallengeCreate}
                />
                :
                <button
                    className="button button-primary app__add-challenges"
                    type="button"
                    onClick={() => setShowDialog(true)}
                >
                    + Add challenge
                </button>
            }
        </Grid>
    )
}

export default Home;
