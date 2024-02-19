import numpy as np
import tensorflow as tf
from PIL import Image
import matplotlib.pyplot as plt
import cv2

# Download and import the pre-trained model
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as viz_utils
from object_detection.builders import model_builder

# Load the pre-trained model
def load_model(model_path):
    detection_model = tf.saved_model.load(model_path)
    return detection_model

# Load label map data
def load_label_map(label_map_path):
    label_map = label_map_util.load_labelmap(label_map_path)
    categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=90, use_display_name=True)
    category_index = label_map_util.create_category_index(categories)
    return category_index

# Function to run inference on a frame
def run_inference(model, category_index, frame):
    input_tensor = tf.convert_to_tensor(frame)
    input_tensor = input_tensor[tf.newaxis,...]

    detections = model(input_tensor)

    num_detections = int(detections.pop('num_detections'))
    detections = {key: value[0, :num_detections].numpy() for key, value in detections.items()}
    detections['num_detections'] = num_detections

    detections['detection_classes'] = detections['detection_classes'].astype(np.int64)

    frame_with_detections = frame.copy()

    viz_utils.visualize_boxes_and_labels_on_image_array(
          frame_with_detections,
          detections['detection_boxes'],
          detections['detection_classes'],
          detections['detection_scores'],
          category_index,
          use_normalized_coordinates=True,
          max_boxes_to_draw=200,
          min_score_thresh=0.30,
          agnostic_mode=False)

    return frame_with_detections

# Paths to model and label map
model_path = 'path/to/your/model'
label_map_path = 'path/to/your/label_map.pbtxt'

# Load model and label map
detection_model = load_model(model_path)
category_index = load_label_map(label_map_path)

# Path to input video
video_path = '/home/hydroponics/video.mp4'

# Open video capture
cap = cv2.VideoCapture(video_path)

# Get video properties
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
fps = int(cap.get(cv2.CAP_PROP_FPS))

# Define codec and create VideoWriter object
out = cv2.VideoWriter('output_video.mp4', cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

# Process video frame by frame
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame from BGR to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Run inference on the frame
    output_frame = run_inference(detection_model, category_index, frame_rgb)

    # Write the annotated frame to the output video
    out.write(cv2.cvtColor(output_frame, cv2.COLOR_RGB2BGR))

# Release video capture and writer
cap.release()
out.release()
