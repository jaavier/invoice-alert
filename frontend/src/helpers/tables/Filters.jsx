import React from 'react';
import Button from '../../components/Forms/Button';

export default function Filters({ statuses, status, setStatus }) {
    return (
        <React.Fragment>
            <div className="text-white mt-1 mr-2 font-semibold">Filters:</div>
            {
                statuses.map((s, index) =>
                    <div className="mr-2" key={index}>
                        <Button
                            type={s.type}
                            text={s.text}
                            onClick={() => setStatus({ key: 'status', value: s.status })}
                            size={1}
                            pressed={status === s.status} />
                    </div>
                )
            }
        </React.Fragment>
    )

}