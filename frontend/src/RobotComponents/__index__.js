import {Head} from './Head.js';
import {Base} from './Base.js';
import {ElbowJoint} from './ElbowJoint.js';
import {ShoulderJoint} from './ShoulderJoint.js';
import {ToolHead} from './ToolHead.js';
import {WristJoint} from './WristJoint.js';




export default function RobotStructure () {
    return(
        <div>
            <Head />
            <Base />
            <ElbowJoint />
            <ShoulderJoint />
            <ToolHead />
            <WristJoint />
        </div>
    )
}