import React, {Component} from 'react';

import Panel from '../Panel/Panel';

import './Colleagues.css';

interface ColleagueProps {
  photo: string;
  name: string;
  status: string;
}

const Colleague: React.FC<ColleagueProps> = ({photo, name, status}) => (
    <tr className="colleague">
        <td>
            <img className="colleague__photo" src={photo} alt={name}/>
        </td>
        <td className="colleague__info">
            <div className="colleague__name">{name}</div>
            <div className="colleague__status">{status}</div>
        </td>
    </tr>
);

interface PersonData {
  picture: {
    thumbnail: string;
  };
  name: {
    first: string;
  };
  status: string;
}

interface ColleaguesProps {
  loading: boolean;
  error?: string | null;
  data?: PersonData[];
}

class Colleagues extends Component<ColleaguesProps> {
    render() {
        let panelContent;

        if (this.props.loading) {
            panelContent = (
                <p>Loading...</p>
            );
        } else {
            if (this.props.error) {
                panelContent = (
                    <p>Something went wrong when fetching the data: <code>{this.props.error}</code></p>
                )
            } else {
                panelContent = (
                    <table className="colleagues-table">
                        <colgroup>
                            <col width="0"/>
                            <col width="100%"/>
                        </colgroup>
                        <tbody>
                        {this.props.data && this.props.data.map((person, index) => (
                            <Colleague
                                key={index}
                                photo={person.picture.thumbnail}
                                name={person.name.first}
                                status={person.status}
                            />
                        ))}

                        </tbody>
                    </table>
                );
            }
        }
        return (
            <Panel title="Colleagues">
                {panelContent}
            </Panel>
        );
    }
}

export default Colleagues;
