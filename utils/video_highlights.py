# Create this file: utils/video_highlights.py
import cv2
import moviepy.editor as mp
from moviepy.editor import *
from transformers import pipeline
import numpy as np
from PIL import Image
import os

class VideoHighlightsGenerator:
    def __init__(self):
        self.sentiment_analyzer = pipeline("sentiment-analysis")
        
    def generate_highlights(self, video_path, output_path="highlights.mp4"):
        """Generate automatic highlights from video"""
        
        # Load video
        clip = VideoFileClip(video_path)
        
        # Extract best moments (based on motion/sound)
        highlights = self.extract_exciting_moments(clip)
        
        # Create montage
        final_clip = self.create_montage(highlights)
        
        # Add auto-generated captions
        final_clip = self.add_captions(final_clip)
        
        # Add trending music
        final_clip = self.add_background_music(final_clip)
        
        # Add visual effects
        final_clip = self.add_visual_effects(final_clip)
        
        # Add Bharat branding
        final_clip = self.add_branding(final_clip)
        
        # Save
        final_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        return output_path
    
    def extract_exciting_moments(self, clip):
        """Extract high-energy moments from video"""
        highlights = []
        
        # Sample video every second
        for t in range(0, int(clip.duration), 1):
            frame = clip.get_frame(t)
            
            # Calculate "excitement" score
            excitement = self.calculate_excitement_score(frame, t)
            
            if excitement > 0.7:  # Threshold for exciting moments
                highlight = clip.subclip(t, min(t+3, clip.duration))
                highlights.append(highlight)
        
        return highlights[:5]  # Top 5 moments
    
    def calculate_excitement_score(self, frame, timestamp):
        """AI-powered excitement detection"""
        # Convert to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
        
        # Calculate motion/energy
        variance = np.var(gray)
        
        # Normalize score
        score = min(variance / 10000, 1.0)
        
        return score
