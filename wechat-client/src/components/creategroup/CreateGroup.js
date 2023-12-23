import { IconButton, TextField } from '@mui/material';
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
const CreateGroup = () => {
    return (
        <div className='create-group-container'>

            <TextField
                id="outlined-textarea"
                label="Enter Group Name"
                placeholder="Write Name"
                multiline
                sx={{

                    marginBottom: -1,
                       width: '70%',
                }}
            />
            <IconButton>
                <AddBoxIcon
                  sx={{
                    fontSize:'50px',
                  
                }}
                ></AddBoxIcon>
            </IconButton>

        </div>
    );
};

export default CreateGroup;
