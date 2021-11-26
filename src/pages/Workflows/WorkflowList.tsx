import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layers } from 'react-feather';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ContentLayout } from '../../components/Layout';
import List from '../../components/List/List';
import ListRow, { RowProps } from '../../components/List/ListRow';
import { RootState } from '../../store';
import { apiWorkflow } from '../../constants/apiTypes';

type paramsType = {
  packageId: string;
};

const WorkflowList = () => {
  const history = useHistory();
  const { packageId } = useParams<paramsType>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [workflows, setWorkflows] = useState<Array<RowProps>>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/workflows/package/${packageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setWorkflows(response.data.map((workflow: apiWorkflow) => workflowToRowData(workflow)));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, packageId]);

  const workflowToRowData = (workflow: apiWorkflow): RowProps => {
    const date = new Date(workflow.createdDate.seconds * 1000);
    const modifiedOn = `Modified On ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return {
      id: workflow.workflowId,
      name: workflow.name,
      columns: [modifiedOn],
    };
  };

  const deleteClick = (workflowId: string) => {
    axios
      .delete(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/workflows/${workflowId}/package/${packageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      })
      .then(
        (response) => {
          if (response.status === 204) {
            setWorkflows(workflows.filter((x) => x.id !== workflowId));
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const editClick = (workflowId: string) => {
    history.push(`/workflow/${workflowId}`);
  };

  return (
    <ContentLayout title="Manage Workflows" data-test="component-workflow-list">
      <List createLabel="Workflow" data-test="workflow-list-list">
        <div>
          {workflows.map((row) => (
            <ListRow
              icon={<Layers />}
              data={row}
              key={row.id}
              onEditClick={() => editClick(row.id)}
              onDeleteClick={() => deleteClick(row.id)}
            />
          ))}
        </div>
      </List>
    </ContentLayout>
  );
};

export default WorkflowList;
