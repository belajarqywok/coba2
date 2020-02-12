package com.example.sms;

import android.os.Bundle;
import android.app.Activity;
import android.app.PendingIntent;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.EditText;
import android.telephony.SmsManager;
import android.content.Intent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.IntentFilter;

public class MainActivity extends Activity {
	final String SMS_TERKIRIM = "SMS_SENT";
	final String SMS_SAMPAI = "SMS_DELIVERED";
	TextView textViewInfo;
	EditText editTextPesan;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		textViewInfo = (TextView) findViewById(R.id.textViewID);
        textViewInfo.setText(""); // Kosongkan

		editTextPesan = (EditText) findViewById(R.id.editTextPesan);

		Button tombolKirim = (Button) findViewById(R.id.buttonKirim);
		tombolKirim.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				PendingIntent PITerkirim = PendingIntent.getBroadcast(
						getApplication(), 0, new Intent(SMS_TERKIRIM), 0);

				PendingIntent PITersampaikan = PendingIntent.getBroadcast(
							getApplication(), 0, new Intent(SMS_SAMPAI), 0);
	
				// Penanganan kalau SMS telah dikirim
				registerReceiver(new BroadcastReceiver() {
					@Override
					public void onReceive(Context arg0, Intent arg1) {
						String pesan;
						switch (getResultCode()) {
						    case Activity.RESULT_OK:
							    pesan = "SMS terkirim"; 
							    break;
						    default:
						    	pesan = "SMS gagal dikirim. Kode = " + 
						                getResultCode();
						}

						String isiSemula = textViewInfo.getText().toString();
					    textViewInfo.setText(isiSemula +
					    		             "\n" +
						                     pesan);
					}
				}, new IntentFilter(SMS_TERKIRIM));
				
				// Penanganan kalau SMS telah tersampaikan
				registerReceiver(new BroadcastReceiver() {
					@Override
					public void onReceive(Context arg0, Intent arg1) {
						String pesan;
						switch (getResultCode()) {
						    case Activity.RESULT_OK:
							    pesan = "SMS tersampaikan";
							    break;
						    default:
						    	pesan = "SMS Gagal disampaikan. Kode = " + 
						                getResultCode();
						}

						String isiSemula = textViewInfo.getText().toString();
					    textViewInfo.setText(isiSemula +
					    		             "\n" +
						                     pesan);
					}
				}, new IntentFilter(SMS_SAMPAI));
						
				// Kirim SMS
			    String nomor = "5556";  
			    
			    SmsManager sms = SmsManager.getDefault();
			    sms.sendTextMessage(nomor, null, 
			    		editTextPesan.getText().toString(), 
			    		PITerkirim, PITersampaikan);
			}
		});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
