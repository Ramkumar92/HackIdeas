import { useState } from "react";
import { useHistory } from "react-router";
import Dialog from "../../components/dialog";
import Grid from "../../components/grid";
import Table from "../../components/table";
import { deleteCookie } from "../../utils/cookies";
import './style.css';

const headers = [
    { label: 'Upvotes', dataKey: 'upvotes', width: 120 },
    { label: 'Title', dataKey: 'title', width: 200 },
    { label: 'Description', dataKey: 'description', width: 350 },
    { label: 'Tags', dataKey: 'tags', width: 220 },
    { label: 'Created On', dataKey: 'createdon', width: 150 }
];

const data = [
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 55, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 12, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
    { upvotes: 1, title: 'test', description: 'ress', tags: 'tags', createdon: '12-jan-102' },
];

const Home = () => {

    const [showDialog, setShowDialog] = useState(false);
    const history = useHistory();

    const logOut = () => {
        deleteCookie('hack_auth_cookie');
        history.push('/login');
    }

    return (
        <Grid container>
            <Grid item xs={8}>
                <h1 className='app__header'>Hack Ideas</h1>
            </Grid>
            <Grid item xs={4}>
                <button
                    onClick={logOut}
                    className="button-icon icon-user app__logout tooltip"
                    type="button">
                    <span className="tooltiptext">Logout</span>
                </button>
            </Grid>
            <Grid item xs={12}
                className='app__table-container'>
                <Table
                    data={data}
                    headers={headers}
                />
            </Grid>
            {showDialog ?
                <Dialog
                    onClose={() => setShowDialog(false)}
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
