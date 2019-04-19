from flask import Flask, render_template, request
import time
from datetime import datetime
from flask_cors import CORS
from bandwidths import BANDWIDTHS

app = Flask('__main__')
CORS(app)

@app.route('/', methods=['GET'])
def getData():
    print("request received",request.args)
    device_uuid = request.args.get('device_uuid')
    end_time = request.args.get('end_time', default=int(time.time()),type=int)
    window_time = request.args.get('window_time', default=60, type=int)
    num_windows = request.args.get('num_windows', default=10, type=int)
    #print(time.time())
    #print("parameters",device_uuid,end_time,window_time,num_windows)
    if(window_time==0 or num_windows==0):
        print("Error sent")
        return('invalid device id',403)
    output = list(filter(lambda item: item["device_id"] == device_uuid and item['timestamp'] <= end_time, BANDWIDTHS))
    #print(output)
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
        return(str(ans),200)
    else:
        print("output",output)
        print("Error sent")
        return('invalid device id',403)
# if __name__ == '__main__':
app.run(debug=True)
