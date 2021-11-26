import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import { ContentLayout } from '../../components/Layout';
import List from '../../components/List/List';
import ListRow, { RowProps } from '../../components/List/ListRow';
import { RootState } from '../../store';
import { apiTemplate } from '../../constants/apiTypes';

type paramsType = {
  siteId: string;
};

const TemplateList = () => {
  const history = useHistory();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [templates, setTemplates] = useState<Array<RowProps>>([]);
  const { siteId } = useParams<paramsType>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/sites/${siteId}/mandatorytemplates`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTemplates(response.data.mandatoryTemplates.map((template: apiTemplate) => templateToRowData(template)));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, siteId]);

  const templateToRowData = (template: apiTemplate): RowProps => {
    var modifiedOn = '';

    if (template.createdDate != null) {
      const date = new Date(template.createdDate.seconds * 1000);
      modifiedOn = `Modified On ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    return {
      id: template.templateId !== '' ? template.templateId : template.name,
      name: template.name,
      columns: [modifiedOn],
    };
  };

  const editClick = (id: string) => {
    history.push(`/templates/${id}`);
  };

  return (
    <ContentLayout title="Mandatory Page Templates" data-test="component-mandatory-page-templates-list">
      <List data-test="mandatory-page-templates-list-list">
        <div>
          {templates.map((row) => (
            <ListRow
              icon={<FontAwesomeIcon icon={faFile} />}
              data={row}
              key={row.id}
              onEditClick={() => editClick(row.id)}
            />
          ))}
        </div>
      </List>
    </ContentLayout>
  );
};

export default TemplateList;
