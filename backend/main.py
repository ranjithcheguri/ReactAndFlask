from flask import Flask, render_template, request
import time
from datetime import datetime
from flask_cors import CORS
from bandwidths import BANDWIDTHS

app = Flask('__main__')
CORS(app)


@app.route('/')
def index():
    return "Hello Flask"


@app.route('/getData', methods=['GET'])
def getData():
    print("request received")
    device_uuid = request.args.get('device_uuid')
    end_time = request.args.get('end_time', default=time.time())
    window_time = request.args.get('window_time', default=60, type=int)
    num_windows = request.args.get('num_windows', default=10, type=int)

    device_uuid = "04827402-0725-437c-bc22-c9670ea084f0"
    end_time = time.time()
    output = list(filter(lambda item: item["device_id"] == device_uuid and item['timestamp'] <= end_time, BANDWIDTHS))
    if(len(output)>0):
        start = output[0]["timestamp"]
        temp=[start,output[0]["bytes_ts"],output[0]["bytes_fs"]]
        temp_window_time =0
        temp_window_num=0
        ans=[]
        for i in range(1,len(output)):
            temp_window_time = start - output[i]["timestamp"]
            if(temp_window_time<=window_time):
                temp[1]+=output[i]["bytes_ts"]
                temp[2]+=output[i]["bytes_fs"]
            else:
                ans.append(temp[:])
                temp_window_num+=1
                start = output[i]["timestamp"]
                temp=[start,output[i]["bytes_ts"],output[i]["bytes_fs"]]
                temp_window_time =0
            if(temp_window_num>=num_windows-1):
                break
        ans.append(temp)
        print("response sent")
        return(str(ans))
    else:
        print("response sent")
        return('invalid device id')    


# if __name__ == '__main__':
app.run(debug=True)
